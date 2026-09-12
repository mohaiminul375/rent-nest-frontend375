import Image from "next/image";
import { MapPin, BedDouble, Bath, ArrowRight } from "lucide-react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IProperty } from "@/lib/types";

interface PropertyProps {
    property: IProperty
}
const PropertyCard = ({ property }: PropertyProps) => {
    // const { } = property
    return (
        <div>
            <Card className="overflow-hidden transition-shadow hover:shadow-lg">
                {/* Image */}
                <div className="relative h-48 w-full bg-muted">
                    {property.thumbnail ? (
                        <Image
                            src={property.thumbnail}
                            alt={property.title}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                            No Image Available
                        </div>
                    )}

                    <Badge className="absolute left-3 top-3">
                        {property.status}
                    </Badge>

                    <Badge
                        variant="secondary"
                        className="absolute right-3 top-3"
                    >
                        {property.category}
                    </Badge>
                </div>

                <CardContent className="space-y-3 p-5">
                    {/* Title */}
                    <div>
                        <h2 className="line-clamp-1 text-xl font-semibold">
                            {property.title}
                        </h2>

                        <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>
                                {property.address}, {property.city}
                            </span>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="line-clamp-2 text-sm text-muted-foreground">
                        {property.description}
                    </p>

                    {/* Property Info */}
                    <div className="flex items-center gap-5 text-sm">
                        <div className="flex items-center gap-1.5">
                            <BedDouble className="h-4 w-4" />
                            <span>{property.bedrooms} Bedroom</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                            <Bath className="h-4 w-4" />
                            <span>{property.bathrooms} Bathroom</span>
                        </div>
                    </div>

                    {/* Price */}
                    <div>
                        <span className="text-2xl font-bold">
                            ৳{Number(property.price).toLocaleString()}
                        </span>
                        <span className="ml-1 text-sm text-muted-foreground">
                            / month
                        </span>
                    </div>
                </CardContent>

                <CardFooter className="p-5 pt-0">
                    <Button className="w-full">
                        <Link href={`/properties/${property.id}`}>View Details</Link>
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default PropertyCard
