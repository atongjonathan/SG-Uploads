import React from "react";
import Layout from "../Layout/Layout";
import Head from "../Components/Head";
import about2 from '../images/about2.jpg'
const AboutUs = () => {

  document.title = `About Us`

  return (
    <Layout>
      <div className="min-height-screen container mx-auto px-2 my-6">
        <Head title={"About Us"}></Head>
      </div>
      <div className="xl:py-20 py-10 px-4">
        <div className="grid grid-flow-row xl:grid-cols-2 gap-4 xl:gap-16 ite ms-center">
          <div>
            <h3 className="text-xl lg:text-3xl mb-4 font-semibold">
              Welcome to StreamGrid
            </h3>
            <p className="mt-3 text-sm leading-8 text-text">
              We’re thrilled to have you here. At StreamGrid, we bring you the latest and greatest in film, from blockbuster hits to indie gems. Whether you’re a casual viewer or a die-hard cinephile, there’s something for everyone. Explore our features to stay updated with the newest movies,  and join the conversation in our community discussions. Grab your popcorn, sit back, and enjoy the show! 🍿
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="p-8 bg-dry rounded-lg">
                <span className="text-3xl block font-extrabold">∞</span>
                <h4 className="text-lg font-semibold my-2">Listed Movies</h4>
                <p className="mb-0 text-text leading-7 text-sm">
                  Updated every day, and on requests
                </p>
              </div>
              <div className="p-8 bg-dry rounded-lg">
                <span className="text-3xl block font-extrabold">∞</span>
                <h4 className="text-lg font-semibold my-2">Lovely Users</h4>
                <p className="mb-0 text-text leading-7 text-sm">
                  Completely free, without registration!. All are welcome.
                </p>
              </div>
            </div>
          </div>
          <img src={about2} className="w-full xl:block h-header rounded-lg object-cover" alt="about us" />

        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;
