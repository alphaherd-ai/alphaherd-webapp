import  {getSession}  from "../../../auth";

export default async function HomePage(){
    const session = await getSession();

  // if (!session?.user) {
  //   return redirect("/api/auth/signin");
  // }

  const user = session?.user;


  console.log(user)

    return <><h1>fsadds</h1></>
}