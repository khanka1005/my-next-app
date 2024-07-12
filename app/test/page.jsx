

import React from 'react'
const handleForm= async (formData)=>{
    "use server";
    console.log(formData)
    const username=formData.get("username")
    console.log("Hello", username)
}
const Page = () => {
  
  return (
    <div>
      <form action={handleForm}>
        <input type="text" name="username" />
        <button>Send</button>
      </form>
    </div>
  )
}

export default Page
