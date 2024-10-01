import { envConfig } from "@/src/config/envConfig";

interface TTeam {
  _id: string;
  image: string;
  name: string;
  role: string;
}

const Team = async () => {
    const res = await fetch(`${envConfig.serverUrl}/team`)
    const data = await res.json()
  return (
    <div className="pb-20">
      <h3 className="text-4xl font-bold text-sky-400 mb-10 text-center">
        Our Team
      </h3>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-4">
      {data?.data?.map((item: TTeam) => (
          <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <img className="rounded-t-lg w-full" src={item?.image} alt="" />
          <div className="p-5 text-center">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              {item?.name}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {item?.role}
            </p>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
