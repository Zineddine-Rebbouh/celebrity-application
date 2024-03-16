import React, { useState } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import Spinner from './Spinner'
import { categories } from '../utils/data'


const CreatePin = ( { user } ) => {
    const [ title, setTitle ] = useState( '' )
    const [ description, setdescription ] = useState( '' )
    const [ loading, setloading ] = useState( true )
    const [ destination, setDestination ] = useState( '' )
    const [ fields, setfields ] = useState( false )
    const [ category, setCategory ] = useState( null )
    const [ imageAsset, setImageAsset ] = useState( null )
    const [ wrongImageType, setWrongImageType ] = useState( false );

    const navigate = useNavigate()

    const SavePin = async () => {
        console.log( user );
        try
        {
            if ( title || description || destination || imageAsset )
            {

                let formData = new FormData();
                // console.log('user', user)
                formData.append( "title", title );
                formData.append( "description", description );
                formData.append( "destination", destination );
                formData.append( "image", imageAsset );
                formData.append( "userId", user._id );
                await fetch( 'http://localhost:8000/create-pin', {
                    method: 'POST',
                    body: formData
                } )

                setTimeout( () => navigate( "/" ), 100 );
            } else
            {
                setfields( true )

                setTimeout( () => {
                    setfields( false )
                }, 4000 );
            }
        }
        catch ( error )
        {

            console.log( error );
            return;
        }
    }

    const uploadImage = ( e ) => {
        const selectedFile = e.target.files[ 0 ]
        if ( selectedFile.type === 'image/gif' || selectedFile.type === 'image/png' || selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/svg' || selectedFile.type === 'image/jpg' )
        {
            setWrongImageType( false )
            setloading( false )
            setImageAsset( selectedFile )
        } else
        {
            setWrongImageType( true )
        }
    }


    return (
        <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
            { fields && (
                <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in ">Please add all fields.</p>
            ) }
            <div className=" flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5  w-full">
                <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
                    <div className=" flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
                        { loading && (
                            <Spinner />
                        ) }
                        {
                            wrongImageType && (
                                <p>It&apos;s wrong file type.</p>
                            )
                        }
                        { !imageAsset ? (
                            // eslint-disable-next-line jsx-a11y/label-has-associated-control
                            <label>
                                <div className="flex flex-col items-center justify-center h-full">
                                    <div className="flex flex-col justify-center items-center">
                                        <p className="font-bold text-2xl">
                                            <AiOutlineCloudUpload />
                                        </p>
                                        <p className="text-lg">Click to upload</p>
                                    </div>

                                    <p className="mt-32 text-gray-400">
                                        or drag and drop your image here...
                                    </p>
                                </div>
                                <input
                                    type="file"
                                    name="upload-image"
                                    onChange={ uploadImage }
                                    className="w-0 h-0"
                                    required
                                />
                            </label>
                        ) : (
                            <div className="relative h-full">
                                <img
                                    src={ URL.createObjectURL( imageAsset ) }
                                    alt="uploaded-pic"
                                    className="object-contain h-full w-full"
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                                    onClick={ () => {
                                        setImageAsset( null )
                                        setloading( true )
                                    } }
                                >
                                    <MdDelete />
                                </button>
                            </div>
                        ) }
                    </div>
                </div>

                <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
                    { user && (
                        <div className="flex gap-2 mt-2 mb-2 items-center bg-white rounded-lg ">
                            <img
                                src={ user.image }
                                className="w-10 h-10 rounded-full"
                                alt="user-profile"
                            />
                            <p className="font-bold text-xl">{ user.username }</p>
                        </div>
                    ) }
                    <input
                        type="text"
                        value={ title }
                        onChange={ ( e ) => setTitle( e.target.value ) }
                        placeholder="Add your title"
                        className="outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-100 p-2"
                        required
                    />
                    <input
                        type="text"
                        value={ description }
                        onChange={ ( e ) => setdescription( e.target.value ) }
                        placeholder="Tell us about your beautiful pin"
                        className="outline-none text-base sm:text-lg border-b-2 border-gray-100 p-2"
                        required
                    />
                    <input
                        type="url"
                        vlaue={ destination }
                        onChange={ ( e ) => setDestination( e.target.value ) }
                        placeholder="Add your Image link"
                        className="outline-none text-base sm:text-lg border-b-2 border-gray-100 p-2"
                        required
                    />

                    <div className="flex flex-col">
                        <div className="flex justify-end items-end mt-5">
                            <button
                                type="submit"
                                onClick={ SavePin }
                                className="w-full bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none"
                            >
                                Save Pin
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default CreatePin
