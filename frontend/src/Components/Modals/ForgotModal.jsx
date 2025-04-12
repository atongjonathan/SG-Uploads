import React, { useEffect, useState } from 'react'
import { DialogBackdrop, Dialog, DialogPanel, DialogTitle, Button, Field, Label, Input as HInput } from '@headlessui/react'
import { IoClose } from 'react-icons/io5'
import { useMutation, useQuery } from '@tanstack/react-query'
import { CgSpinner } from 'react-icons/cg'
import { toast } from 'sonner'
import { sendResetEmail, verifResetPassword } from '../../utils/Backend'
import { useNavigate, useParams } from 'react-router-dom'
import Puff from 'react-loading-icons/dist/esm/components/puff'
import ResetPassword from './ResetPassword'

const ForgotModal = ({ isForgotModalOpen, setForgotModal, openLogin  }) => {


  const { userToken, ruidb64, rtoken } = useParams()


  const isVerifyData = !!(userToken && ruidb64 && rtoken)

  const [email, setEmail] = useState("");






  const { mutate, isPending } = useMutation({
    mutationKey: ["forgotMutation"],
    mutationFn: (e) => {
      e.preventDefault()
      e.stopPropagation()

      return sendResetEmail(email)

    },
    onSuccess: () => {
      toast.success("Email Sent")
      setDisabled(true)
      const countdown = setInterval(() => {
        setCounter(prev => {
          if (prev <= 1) {
            clearInterval(countdown)
            setDisabled(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      setCounter(30)
    },
    onError: (err) => {
      let status = err.response.status
      console.log(status);
      toast.error(status === 404 ? "No StreamGrid User matches the given email." : "An error occured. Please try again later.")
    }
  })

  const close = () => setForgotModal(false)

  const [disabled, setDisabled] = useState(false);
  const [counter, setCounter] = useState(30);

  const navigate = useNavigate()

  const verifyQuery = useQuery({
    queryKey: ["verifyTokens", userToken, ruidb64, rtoken],
    queryFn: () => verifResetPassword(userToken, ruidb64, rtoken),
    enabled: isVerifyData,
    retry: false

  })


  useEffect(() => {

    if (!verifyQuery.isFetched) return
    else if (verifyQuery.isSuccess) {
      toast.success("Link has been validated")

    }
    else if (verifyQuery.isError) {
      close()
      const responseError = verifyQuery.error.response?.data.error
      if (responseError) {
        toast.error(responseError)
      }
      else toast.error("Invalid link")
      navigate("/")

    }

  }, [verifyQuery.isSuccess, verifyQuery.isFetched, verifyQuery.isError]);

  useEffect(() => {

    if (isVerifyData) {
      setForgotModal(true)
    }

  }, [isVerifyData]);

  return (
    <Dialog open={isForgotModalOpen} as="div" className="relative z-20 focus:outline-none" onClose={close}>
      <DialogBackdrop className="fixed inset-0 bg-main/50"></DialogBackdrop>


      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center">
          <DialogPanel
            transition
            className="relative gap-3 w-4/5 md:4/12 lg:w-3/12 xl:w-3/12 space-y-4 border bg-main text-text rounded-lg p-4 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <Button onClick={close} className='absolute top-3 right-5 text-text hover:text-subMain transitions'><IoClose className="h-5 w-5"></IoClose></Button>


            {
              verifyQuery.isFetching ? <div className='my-3 flex flex-col justify-center items-center gap-4'>
                <DialogTitle as="h3" className="text-base/3 text-white flex items-center gap-1">
                  <p className='text-sm'>Validating Link</p>
                </DialogTitle>

                <Puff />
              </div> : verifyQuery.isSuccess ? <>
                <DialogTitle as="h3" className="text-base/3 text-white flex items-center gap-1">

                  Set New Password
                </DialogTitle>

                <ResetPassword params={{ userToken, ruidb64, rtoken }} close={close} openLogin={openLogin}/>
              </> : <>
                <DialogTitle as="h3" className="text-base/3 text-white flex items-center gap-1">

                  Reset Password
                </DialogTitle>

                <form onSubmit={mutate} className='text-sm'>


                    <Field className="text-sm w-full">
                      <Label className="text-border font-semibold" htmlFor={"email"}>{"Email address"}</Label>
                      <HInput initialValue={""} type={'email'} placeholder={'Email address'} name={'email'} required className={`w-full text-sm mt-2 p-2 border border-border rounded text-white  focus:border-b-subMain focus: bg-main`} onInput={(e) => {
                        let input = e.target
                        setEmail(input.value)
                      }} />


                    </Field>


                  <div className="flex gap-2  sm:flex-row justify-end items-center my-4 text-sm">

                    <Button type='submit' className="bg-main transitions hover:bg-subMain border border-subMain text-white py-2 px-3 rounded w-full sm:w-auto flex items-center justify-center" disabled={disabled}>{disabled ? `Wait ${counter}s` : isPending ? <CgSpinner className="animate-spin" /> : "Send Email"}</Button>

                  </div>
                </form>
              </>
            }



          </DialogPanel>
        </div>
      </div>


    </Dialog >
  )
}

export default ForgotModal
