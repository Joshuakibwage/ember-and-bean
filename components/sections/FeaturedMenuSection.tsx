
import connectDB from "@/lib/db";
import MenuItem from "@/models/MenuItem";
import FeaturedMenu from "@/components/sections/FeaturedMenu";


const FeaturedMenuSection = async () => {

    await connectDB();

    const items = await MenuItem.find({ available: true }).sort({ createdAt: -1 }).limit(4).lean();

    return <FeaturedMenu items={JSON.parse(JSON.stringify(items))} />;
};

export default FeaturedMenuSection;