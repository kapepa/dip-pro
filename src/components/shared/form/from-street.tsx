import { Input } from '@/components/ui/input';
import { useState, useEffect, useRef, FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { RequiredSymbol } from '../required-symbol';
import { ClearButton } from '../clear-button';
import { ErrorMessage } from '@hookform/error-message';
import { ErrorText } from '../error-text';

interface FromStreetProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  name: string;
  label?: string;
  required?: boolean;
}

const FromStreet: FC<FromStreetProps> = (props) => {
  const { name, label, required, className, ...otherProps } = props;
  const {
    register,
    formState: { errors },
    setValue,
    watch,
    trigger
  } = useFormContext();

  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  const fieldValue = watch(name);

  const extractOdessaStreet = (displayName: string): string => {
    const parts = displayName.split(',');

    const streetPart = parts[0].trim();
    const odessaPart = parts.find(part =>
      part.trim().toLowerCase().includes('одеса') ||
      part.trim().toLowerCase().includes('odesa')
    ) || 'Одеса';

    return `${streetPart}, ${odessaPart.trim()}`;
  };

  const handleClear = () => {
    setValue(name, "", {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const searchOdessaStreets = async (query: string) => {
    if (query.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?` +
        `q=${encodeURIComponent(query + ', Одеса, Україна')}` +
        `&format=json` +
        `&addressdetails=1` +
        `&countrycodes=ua` +
        `&accept-language=uk` +
        `&limit=8`
      );

      const data = await response.json();

      // Filter and process results for Odessa
      const odessaStreets = data
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        .filter((item: any) =>
          item.display_name.toLowerCase().includes('одеса') ||
          item.display_name.toLowerCase().includes('odesa') ||
          (item.address && (item.address.city === 'Одеса' || item.address.town === 'Одеса'))
        )
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((item: any) => ({
          ...item,
          clean_name: extractOdessaStreet(item.display_name)
        }));

      setSuggestions(odessaStreets);
      setShowSuggestions(odessaStreets.length > 0);
    } catch (error) {
      console.error('Error fetching street data:', error);
      setSuggestions([]);
      setShowSuggestions(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      searchOdessaStreets(fieldValue || '');
    }, 300);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [fieldValue]);

  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSuggestionClick = (suggestion: any) => {
    setValue(name, suggestion.clean_name, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
    setSuggestions([]);
    setShowSuggestions(false);
    trigger(name);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  const handleInputFocus = () => {
    if (fieldValue && fieldValue.length > 1) {
      searchOdessaStreets(fieldValue);
    }
  };

  return (
    <div className={className}>
      {label && (
        <p className="font-medium mb-2">
          {label} {required && <RequiredSymbol />}
        </p>
      )}
      <div className="relative">
        <Input
          className="h-12 text-base"
          {...register(name)}
          onBlur={handleInputBlur}
          onFocus={handleInputFocus}
          placeholder="Введіть назву вулиці в Одесі"
          {...otherProps}
        />
        {fieldValue && (
          <ClearButton onClick={handleClear} />
        )}

        {isLoading && (
          <div className="absolute z-20 top-full left-0 right-0 bg-white border border-gray-300 rounded-md mt-1 p-3 shadow-lg">
            <div className="text-center text-gray-500">Пошук вулиць Одеси...</div>
          </div>
        )}

        {showSuggestions && suggestions.length > 0 && !isLoading && (
          <div className="absolute z-20 top-full left-0 right-0 bg-white border border-gray-300 rounded-md mt-1 shadow-lg max-h-60 overflow-y-auto">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.place_id}
                className="p-3 hover:bg-blue-50 cursor-pointer border-b last:border-b-0"
                onClick={() => handleSuggestionClick(suggestion)}
                onMouseDown={(e) => e.preventDefault()}
              >
                <div className="font-medium">
                  {suggestion.clean_name}
                </div>
                <div className="text-sm text-gray-500">
                  Одеса, Україна
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <ErrorText
            text={message}
            className="mt-2"
          />
        )}
      />
    </div>
  );
};

export { FromStreet };