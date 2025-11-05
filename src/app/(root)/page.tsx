import { Container } from "@/components/shared/container";
import { FilterBar } from "@/components/shared/filter-bar";
import { GetSearchParamProps } from "@/components/shared/interfaces/get-search-param";
import { ProductsGroupList } from "@/components/shared/products-group-list";
import { Title } from "@/components/shared/title";
import { TopBar } from "@/components/shared/top-bar";
import { findPizza } from "@/lib/get-search-param";
import { Suspense } from "react";

interface HomeProps {
  searchParams: Promise<GetSearchParamProps>
}

export default async function Home(props: HomeProps) {
  const params = await props.searchParams;
  const { max, categories } = await findPizza(params);

  return (
    <>
      <Container
        className="mt-10"
      >
        <Title
          size="lg"
          className="font-extrabold text-center lg:text-left"
        >
          Наше меню
        </Title>
      </Container>
      <TopBar
        categories={categories}
      />
      <Container
        className="pb-14 mt-10"
      >
        <div
          className="flex gap-10 lg:gap-24"
        >
          <div
            className="md:min-w-1/6 hidden md:block"
          >
            <Suspense>
              <FilterBar
                max={max}
              />
            </Suspense>
          </div>

          <div
            className="flex-1"
          >
            <div
              className="flex flex-col gap-16"
            >
              {
                categories.map((category) => (
                  category.products.length > 0 && (
                    <ProductsGroupList
                      id={category.id}
                      key={category.id}
                      title={category.name}
                      products={category.products}
                      categoryId={category.id}
                    />
                  )
                ))
              }
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
