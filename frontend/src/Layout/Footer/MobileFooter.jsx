import React, { useCallback, useContext, useState } from 'react'
import { BsHouseAddFill } from 'react-icons/bs'
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from '@headlessui/react'
import AuthContext from '../../context/AuthContext';
import { Dialog, DialogPanel, DialogTitle, DialogBackdrop } from '@headlessui/react'
import PopMenu from './PopMenu';
import { FaSearch } from 'react-icons/fa';
import { MovieContext } from '../../context/MovieContext';
import SignUpModal from '../../Components/Modals/SignUpModal';
import LoginModal from '../../Components/Modals/LoginModal';
import { IoClose, IoTime } from 'react-icons/io5'
import Results from '../../Components/Home/Results';
import { useQuery } from '@tanstack/react-query';
import { getMovies } from '../../utils/Backend';

const MobileFooter = () => {
    const Hover = 'transitions text-2xl flex-colo hover:bg-white hover:text-main text-white rounded-md px-4 py-3'
    const { user } = useContext(AuthContext)
    let [isLoginOpen, setisLoginOpen] = useState(false)
    let [isSignUpOpen, setIsSignUpOpen] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [isResults, setResults] = useState(null);
    const movies = useContext(MovieContext)?.movies || [];
    const navigate = useNavigate()



    const closeLogin = useCallback(() => {
        setisLoginOpen(false);
    })

    const closeSignUp = useCallback(() => {
        setIsSignUpOpen(false);
    }, []);

    const [query, setQuery] = useState("");


    const { data, isFetching } = useQuery({
        queryKey: ["searchQuery", query],
        enabled: !!query,
        queryFn: async () => {
            const config = {
                params: {
                    search: query,
                    limit: 6
                }
            }
            return await getMovies(config).then((res) => res.results)
        }
    })

    const [searchParams, setSearchParams] = useSearchParams();

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setQuery(value);
        // console.log(pathname);


        const params = new URLSearchParams(searchParams);
        if (value) {
            params.set("search", value);
        } else {
            params.delete("search");
        }
        params.set("page", "1"); // optional: reset page on search
        setSearchParams(params);
    };




    const openSignUp = useCallback(() => {
        setisLoginOpen(false)
        setIsSignUpOpen(true)

    })
    const openLogin = useCallback(() => {
        setIsSignUpOpen(false)
        setisLoginOpen(true)

    })


    const handleResultClick = useCallback((title) => {
        navigate(`/watch/${title}`);
        setShowModal(false)
        setResults(null);
    })



    return (
        <>


            <footer className='lg:hidden fixed z-50 bottom-0 w-full px-1'>
                <div className=" rounded-md p-1 bg-gradient-to-t from-dry from-40% to-100% flex justify-around items-center">

                    <NavLink title="Movies" className={Hover} to="/">
                        <BsHouseAddFill></BsHouseAddFill><p className='text-xs'>Home</p>
                    </NavLink>

                    <Button onClick={() => setShowModal(true)} className="transitions text-2xl flex flex-col items-center hover:bg-white hover:text-main text-white rounded-md px-4 py-3">
                        <FaSearch /> <p className='text-xs'>Search</p>
                    </Button>

                    <PopMenu user={user}></PopMenu>
                    {
                        user && <NavLink to="/profile" className="transitions text-2xl flex flex-col items-center hover:bg-white hover:text-main text-white rounded-md px-4 py-3">
                            <IoTime /> <p className='text-xs'>History</p>
                        </NavLink>
                    }






                </div>
                <Dialog open={showModal} onClose={() => setShowModal(false) && setResults(null)} className="relative z-50">
                    <DialogBackdrop className="fixed inset-0 bg-main/50"></DialogBackdrop>

                    <div className="fixed inset-0 flex w-full items-start justify-center p-4">
                        <DialogPanel className="relative max-w-lg space-y-4 border border-gray-800 bg-dry p-6 lg:p-10 text-text rounded-lg w-full">
                            <DialogTitle className="font-bold">Find a Movie</DialogTitle>
                            <Button onClick={() => setShowModal(false)} className='absolute top-0 right-3 text-text hover:text-subMain transitions'><IoClose className="h-5 w-5"></IoClose></Button>
                            <div className="flex">
                                <input
                                    type="text"
                                    placeholder="Search movie title or concept ..."
                                    className={"font-medium text-sm placeholder:text-xs w-full h-9 bg-transparent border-none px-2 text-black bg-white mt-5" + { Hover }}
                                    onInput={handleSearch}
                                />
                                <button type="button" className="bg-subMain w-12 flex-colo h-9 rounded text-white" onClick={() => navigate("/movies?search=" + query)}>
                                    <FaSearch />
                                </button>
                            </div>

                            {(query && showModal) && (
                                <Results isResults={data} handleResultClick={handleResultClick} isFetching={isFetching}></Results>

                            )}
                        </DialogPanel>
                    </div>
                </Dialog>
                <SignUpModal isSignUpOpen={isSignUpOpen} setIsSignUpOpen={setIsSignUpOpen} openLogin={openLogin} closeSignUp={closeSignUp} ></SignUpModal>

                <LoginModal isLoginOpen={isLoginOpen} setIsLoginOpen={setisLoginOpen} openSignUp={openSignUp} closeLogin={closeLogin} ></LoginModal>


            </footer>
        </>

    )
}

export default MobileFooter
