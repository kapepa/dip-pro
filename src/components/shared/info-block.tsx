"use client";

import React from 'react';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';
import { Title } from './title';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { signOut } from "next-auth/react";

interface Props {
  title: string;
  text: string;
  className?: string;
  imageUrl?: string;
}

export const InfoBlock: React.FC<Props> = ({
  className,
  title,
  text,
  imageUrl,
}) => {
  return (
    <div
      className={cn(
        `
        w-full
        max-w-[840px]
        flex flex-col-reverse
        md:flex-row
        items-center
        justify-between
        gap-8 md:gap-12
        `,
        className
      )}
    >
      {/* TEXT */}
      <div className="flex flex-col w-full md:max-w-[445px]">
        <Title
          size="lg"
          className="font-extrabold text-center md:text-left"
        >
          {title}
        </Title>

        <p className="text-gray-400 text-sm sm:text-base md:text-lg mt-2 text-center md:text-left">
          {text}
        </p>

        {/* ACTIONS */}
        <div
          className="
            flex flex-col sm:flex-row
            gap-3 sm:gap-5
            mt-8 sm:mt-10 md:mt-11
            w-full
            justify-center md:justify-start
          "
        >
          <Link href="/" className="w-full sm:w-auto">
            <Button variant="outline" className="gap-2 w-full sm:w-auto">
              <ArrowLeft />
              На головну
            </Button>
          </Link>

          <Button
            variant="outline"
            className="
              w-full sm:w-auto
              text-gray-500 border-gray-400
              hover:bg-gray-50
            "
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Очистити кеш
          </Button>
        </div>
      </div>

      {/* IMAGE */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="
            w-[180px]
            sm:w-[220px]
            md:w-[300px]
            object-contain
          "
        />
      )}
    </div>
  );
};
