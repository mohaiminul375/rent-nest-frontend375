import { getPropertiesById } from "../../_actions/getPropertiesById";
import Image from "next/image";
import {
  MapPin,
  BedDouble,
  Bath,
  CalendarDays,
  Home,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getMe } from "@/service/getMe";
const PropertyById = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const property = await getPropertiesById(id)
  const user = await getMe();
  console.log(user)
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 flex flex-wrap gap-2">
            <Badge>{property.data.status}</Badge>
            <Badge variant="secondary">{property.data.category}</Badge>
          </div>

          <h1 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
            {property.data.title}
          </h1>

          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0" />
            <span>
              {property.data.address}, {property.data.city}
            </span>
          </div>
        </div>

        <div className="shrink-0">
          <span className="text-2xl font-bold sm:text-3xl">
            ৳{Number(property.data.price).toLocaleString()}
          </span>
          <span className="text-sm text-muted-foreground"> / month</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* Image */}
        <Card className="overflow-hidden">
          <div className="relative aspect-video w-full bg-muted sm:aspect-16/10 lg:aspect-16/11">
            {property.data.thumbnail ? (
              <Image
                src={property.data.thumbnail}
                alt={property.data.title}
                fill
                priority
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                No Image Available
              </div>
            )}
          </div>
        </Card>

        {/* Property Information */}
        <Card>
          <CardContent className="p-5 sm:p-6">
            <h2 className="mb-5 text-xl font-semibold">
              Property Information
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <InfoItem
                icon={<BedDouble />}
                label="Bedrooms"
                value={property.data.bedrooms}
              />

              <InfoItem
                icon={<Bath />}
                label="Bathrooms"
                value={property.data.bathrooms}
              />

              <InfoItem
                icon={<Home />}
                label="Category"
                value={property.data.category}
              />

              <InfoItem
                icon={<MapPin />}
                label="City"
                value={property.data.city}
              />
            </div>

            {
              user.data?.role === "TENANT" && <Button className="mt-6 w-full">
                Request to Rent
              </Button>
            }
          </CardContent>
        </Card>
      </div>

      {/* Description */}
      <Card className="mt-6">
        <CardContent className="p-5 sm:p-6">
          <h2 className="mb-3 text-xl font-semibold">
            Description
          </h2>

          <p className="text-sm leading-7 text-muted-foreground sm:text-base">
            {property.data.description}
          </p>
        </CardContent>
      </Card>

      {/* Location + Dates */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <Card>
          <CardContent className="flex gap-4 p-5">
            <MapPin className="mt-1 h-5 w-5 shrink-0" />

            <div>
              <h3 className="font-semibold">Location</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {property.data.address}, {property.data.city}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex gap-4 p-5">
            <CalendarDays className="mt-1 h-5 w-5 shrink-0" />

            <div>
              <h3 className="font-semibold">Listed On</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {new Date(property.data.createdAt).toLocaleDateString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-lg border p-3 sm:p-4">
      <div className="mb-2 h-5 w-5 [&>svg]:h-5 [&>svg]:w-5">
        {icon}
      </div>

      <p className="text-xs text-muted-foreground">
        {label}
      </p>

      <p className="mt-1 font-medium">
        {value}
      </p>
    </div>
  );
}

export default PropertyById
