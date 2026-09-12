import { IProperty } from "@/lib/types";
import { getProperties } from "../_actions/getProperties"
import PropertyCard from "../_components/PropertyCard";

const Properties = async () => {
    const property = await getProperties();
    console.log(property)
    if (!property.success || !property.data?.length) {
        return (<p className="py-12 text-center text-muted-foreground">No property found</p>)
    }
    return (
        <section className="mt-10">
            {/* heaidng */}
            <div>
                <h1 className="text-center font-semibold lg:text-3xl">Chose your favourite Property.</h1>
            </div>
            {/* filter shorting */}
            <div className="mt-10">

            </div>
            {/* main content */}
            <div className="mt-10 grid lg:grid-cols-3 gap-4">
                {
                    property?.data.map((property:IProperty) => <PropertyCard
                        key={property.id}
                        property={property}
                    />)
                }
            </div>
        </section>
    )
}

export default Properties
