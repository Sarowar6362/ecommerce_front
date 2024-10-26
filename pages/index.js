import Header from "@/components/Header";
import Featured from "@/components/Featured";
import Center from "@/components/Center";
import SearchBar from "@/components/SearchBar"; // Import SearchBar
import Title from "@/components/Title";
import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import NewProducts from "@/components/NewProducts";
import { useRouter } from "next/router"; // Import useRouter for navigation

export default function HomePage({ featuredProduct, newProducts }) {
  const router = useRouter(); // Initialize useRouter

  const handleSearch = async (query) => {
    // Redirect to the products page with the search query
    router.push(`/products?title=${encodeURIComponent(query)}`);
  };

  return (
    <div>
      <Header />
      
      <Featured product={featuredProduct} />
      <SearchBar onSearch={handleSearch} /> 
      <NewProducts products={newProducts} />
    </div>
  );
}

export async function getServerSideProps() {
  // Replace with your actual ID
  await mongooseConnect();

  const newProducts = await Product.find({}, null, { sort: { '_id': -1 }, limit: 10 });
  return {
    props: {

      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}
