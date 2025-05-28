import Card from "@/components/Card";

const Home = () => {
  return (
    <>
      {/* The main content wrapper with overflow-y-auto */}
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-col gap-8 flex-grow">
          <div className="mb-24">
            <Card />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
