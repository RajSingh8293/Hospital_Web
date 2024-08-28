/* eslint-disable react/prop-types */
import CategoryCard from "./CategoryCard"

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

const CategoryCarousal = ({ category, title }) => {
    return (
        <section className="px-10">
            <h1 className="text-3xl font-bold my-4 text-center">{title}</h1>
            <div className="lg:px-10 py-4">
                <Carousel className="w-full">
                    <CarouselContent className="-ml-1">
                        {category?.map((item, index) => (
                            <CarouselItem key={index} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                                <div className="">
                                    <Card>
                                        <CardContent className="">
                                            <CategoryCard item={item} />
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </section>

    )
}

export default CategoryCarousal