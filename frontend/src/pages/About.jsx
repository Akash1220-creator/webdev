import React from "react";
import { useAuth } from "../Context/AuthProvider";

function About() {
  const { profile } = useAuth();
  console.log(profile);
  return (
    <div className="container mx-auto my-12 p-4 space-y-9">
      <h1 className="text-2xl font-bold mb-6">About</h1>
      <p>
        This is{" "}
        <strong className="text-blue-800 font-semibold hover:scale-105 duration-500">
          {profile?.user?.name}
        </strong>{" "}
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto, doloremque doloribus, impedit sit qui ipsam sint veniam ducimus velit, ad aliquam. Aspernatur pariatur odio nam quod velit maxime. Totam, accusantium.
      </p>
      <h2 className="font-semibold text-blue-800 text-xl">
        Technical Expertise:
      </h2>
      <p>
       Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet velit dolores, animi autem, fugiat magni aspernatur nihil debitis placeat laborum cupiditate, eaque odit officia quibusdam! Esse totam modi sequi qui.
      </p>
      <h2 className="font-semibold text-blue-800 text-xl">
        Professional Highlights:
      </h2>
      <p>
       Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi minima atque veniam hic quod harum sunt doloremque a, odit nihil perspiciatis sed accusamus ut cupiditate, ipsa velit? Laborum, dolorem quo!
      </p>
      <br />
      <span>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam possimus iusto sequi quam, labore veritatis voluptate facilis saepe. Sapiente sunt similique mollitia eius! Ipsam, quo! Facilis dicta harum aut consectetur.
      </span>
      <h2 className="font-semibold text-blue-800 text-xl">
        Personal Interests and Inspiration:
      </h2>
      <p>
       Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe debitis corporis obcaecati officiis ducimus quaerat totam, animi ipsam dignissimos. Labore optio animi eaque quisquam quos sunt ea dolor eius vel!
      </p>
    </div>
  );
}

export default About;