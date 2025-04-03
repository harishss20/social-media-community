"use client";

import { useEffect, useState } from "react";
import { Commet } from "react-loading-indicators";
import { createCommunity } from "../api/communityAPI";
import { useRouter } from "next/navigation";
export default function Create() {
  const [wait, setWait] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    communityImage_url: "",
    bannerImage_url: "",
    rules: "",
  });
  const router = useRouter();

  useEffect(() => {}, [data.bannerImage_url, data.communityImage_url]);

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Profile_img");
    formData.append("cloud_name", "dttdxreiq");
    setWait(true);
    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dttdxreiq/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      setWait(false);
      return data.secure_url;
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      return null;
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const fieldName = e.target.name;

    console.log("Uploading image for:", fieldName);
    if (!file) return;

    const imageUrl = await uploadToCloudinary(file);

    if (imageUrl) {
      setData((prev) => ({
        ...prev,
        [fieldName]: imageUrl,
      }));
    }
  };
  const handleCommunityData = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await createCommunity({ data });
    if (success) {
      router.push(`/community/${data.name}`);
      setData({
        name: "",
        description: "",
        communityImage_url: "",
        bannerImage_url: "",
        rules: "",
      });
    }
  };

  // if (!data.bannerImage_url || !data.communityImage_url)
  //   return (
  //     <div className="flex justify-center items-center h-[80vh]">
  //       <Commet size="small" color="#cac8ff" />
  //     </div>
  //   );
  // if (error) return null;
  return (
    <div className="flex justify-center min-h-full mt-10 pb-10 rounded-lg">
      <div className="w-[800px] pb-10 flex flex-col items-center space-y-28 bg-[#30313b] rounded-xl relative">
        <form
          onSubmit={handleSubmit}
          className="w-[800px] pb-10 flex flex-col items-center space-y-28 bg-[#30313b] rounded-xl relative"
        >
          <div className="w-full pl-14 pr-14 flex flex-col justify-center items-center ">
            <div className="pt-5 w-full flex flex-col space-y-10">
              <section className="flex flex-col items-center bold text-2xl text-accent">
                <b>Create Community</b>
              </section>
              <div className="flex mt-10 flex-row w-full space-x-14 ">
                <section className="flex flex-col">
                  <label
                    htmlFor="name"
                    className="pr-4 text-secondary font-bold w-"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={data.name}
                    placeholder="Ex: cooper"
                    onChange={handleCommunityData}
                    className="pl-2 h-8 text-gray-300 bg-[#171717] w-60  rounded"
                  />
                </section>
                <div className="flex flex-col space-y-6">
                  <section className="flex ">
                    <label
                      htmlFor="Banner"
                      className="pr-4 text-secondary font-bold"
                    >
                      Banner
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      name="bannerImage_url"
                      onChange={handleImageUpload}
                      className=" h-full w-full rounded "
                    />
                  </section>
                  <section className="flex ">
                    <label
                      htmlFor="communityImage_url"
                      className="pr-4 text-secondary font-bold"
                    >
                      Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      name="communityImage_url"
                      onChange={handleImageUpload}
                      className="ml-1.5 mb-4"
                    />
                  </section>
                </div>
              </div>
            </div>
            <section className="flex flex-col w-full">
              <label
                htmlFor="description"
                className="pr-4 mb-2 text-secondary font-bold"
              >
                Description
              </label>
              <textarea
                type="text"
                name="description"
                value={data.description}
                onChange={handleCommunityData}
                placeholder="About the community"
                className="pl-2 h-20 resize-none rounded text-gray-300 pt-2 bg-[#171717]"
              />
              <section className="flex flex-col">
                <label htmlFor="rules" className="mt-6 mb-2">
                  Rules
                </label>
                <textarea
                  type="text"
                  name="rules"
                  value={data.rules}
                  onChange={handleCommunityData}
                  className="pl-2 h-24 rounded resize-none text-gray-300 pt-2 bg-[#171717]"
                  placeholder="Rules for Community"
                />
              </section>
            </section>
            <button
              disabled={wait}
              className="mt-4 w-24 text-primary bg-red-50"
            >
              submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
