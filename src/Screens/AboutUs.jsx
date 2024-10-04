import React from "react";
import Layout from "../Layout/Layout";
import Head from "../Components/Head";

const AboutUs = () => {
  return (
    <Layout>
      <div className="min-height-screen container mx-auto px-2 my-6">
        <Head title={"About Us"}></Head>
      </div>
      <div className="xl:py-20 py-10 px-4">
        <div className="grid grid-flow-row xl:grid-cols-2 gap-4 xl:gap-16 items-center">
          <div>
            <h3 className="text-xl lg:text-3xl mb-4 font-semibold">
              Welcome to our Netflixo
            </h3>
            <p className="mt-3 text-sm leading-8 text-text">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint
              sequi incidunt vitae minima mollitia eaque deleniti, dolorem esse
              magnam excepturi, magni amet sed reprehenderit optio suscipit,
              odio dolorum ducimus reiciendis! Lorem ipsum dolor sit, amet
              consectetur adipisicing elit. Cumque nisi quibusdam voluptatibus
              corporis dicta, aperiam eius aliquam, ullam deleniti esse
              praesentium voluptas iusto molestiae? Voluptates dolore quasi qui
              labore pariatur? Natus placeat repellendus qui officia laborum
              obcaecati enim incidunt perferendis sapiente accusantium
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="p-8 bg-dry rounded-lg">
                <span className="text-3xl block font-extrabold">10K</span>
                <h4 className="text-lg font-semibold my-2">Listed Movies</h4>
                <p className="mb-0 text-text leading-7 text-sm">
                  Lorem Ipsum is simply dummy text of the printing and
                </p>
              </div>
              <div className="p-8 bg-dry rounded-lg">
                <span className="text-3xl block font-extrabold">8K</span>
                <h4 className="text-lg font-semibold my-2">Lovely Users</h4>
                <p className="mb-0 text-text leading-7 text-sm">
                  Completely free, without registration! Lorem Ipsum is simply
                </p>
              </div>
            </div>
          </div>
          <img src="https://netflixo.vercel.app/images/about2.jpg" className="w-full xl:block h-header rounded-lg object-cover" alt="about us"/>

        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;
