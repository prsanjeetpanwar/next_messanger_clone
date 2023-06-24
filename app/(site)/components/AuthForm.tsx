"use client"
import Input from "@/app/components/Input";
import { type } from "os";
import Button from "@/app/components/Button ";
import {BsGithub,BsGoogle} from 'react-icons/bs'
import { useCallback, useState } from "react";
import AuthSocialButton from "./AuthSocialButton";
import axios from "axios";
import { useForm,FieldValues ,SubmitHandler} from "react-hook-form";
type Variant='LOGIN'|'REGISTER'

const AuthForm  = () => {
    const [variant,setvariant]=useState<Variant>('LOGIN')
    const [isLoading,setLoding]=useState(false)


    const toggleVarinent=useCallback(()=>{
    if(variant==='LOGIN')  {
     setvariant('REGISTER')  

    }
    else{
      setvariant('LOGIN')

    }
    },[variant])
    const {register,handleSubmit,formState:{
        errors
    }}=useForm<FieldValues>({
  defaultValues:{
    name:'',
    email:'',
    password:''
  }
    })
    const onSubmit:SubmitHandler<FieldValues>=(data)=>{
      setLoding(true);
      if(variant==='REGISTER'){
axios.post('/api/register',data)
      } 
      if(variant==='LOGIN'){


      } 

    }

    const socialAction=(action:string)=>{
        setLoding(true);

    }
    return ( 
        <div className="mt-8 
        sm:mx-auto
        sm:w-full sm:max-w-md">
        <div className="bg-white
        px-4
        py-8
        shadow
        sm:rounded-lg
        sm:px-10">
<form  className="space-y-6
" onSubmit={handleSubmit(onSubmit)}>
  {variant==='REGISTER' &&(
<Input id="name" label="name"
  register={register}  errors={errors}  />)}

<Input id="email" label="Email address" type="email"
  register={register}  errors={errors} 
  disabled={isLoading} />
<Input id="password" label="password" type="password"
  register={register}  errors={errors} 
  disabled={isLoading} />

  <div>
    <Button disabled={isLoading}
    fullwidth 
    type='submit'>{
      variant==="LOGIN"?"Sign in":"REGISTER"
      }</Button>
  </div>
</form>
<div className="mt-6">
          <div className="relative">
            <div 
              className="
                absolute 
                inset-0 
                flex 
                items-center
              "
            >
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
    <AuthSocialButton icon={BsGithub}
    onClick={()=>socialAction('github')}
    />
    <AuthSocialButton icon={BsGoogle}
    onClick={()=>socialAction('github')}
    />
    
</div>
</div>
<div className="flex
gap-2
justify-center
text-sm
mt-6
px-2
text-gray-500">

  <div>
    {variant==="LOGIN"?"New to Messenger?":'already have account'}
  </div>
  <div onClick={toggleVarinent}
  className="underline cursor-pointer">{variant==="LOGIN"?"Create an account":"Login"}</div>
</div>
        </div>
        </div>
     );
}
 
export default AuthForm ;