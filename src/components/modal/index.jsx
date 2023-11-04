import React, { useState, useEffect } from 'react'
import config from '../../../config/config.json'
import './modal.css'

import { useLocation } from 'react-router-dom';
import axios from 'axios';
import * as Ai from "react-icons/ai";
import { motion, AnimatePresence } from 'framer-motion';

import Button from '../button';

function Modal({ open, onClose, success }) {
  const location = useLocation();

  const [codename, setCodename] = useState('');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [files, setFiles] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const pathToCategoryMap = {
      '/release/love': 'post',
      '/release/sadness': 'sadpost',
      '/release/anger': 'angerpost',
    };

    const newPath = pathToCategoryMap[location.pathname] || '';
    setCategory(newPath);
  }, [location.pathname]);

  const previewFile = (file) => {
    const reader = new FileReader()
    if (file) {
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        setImage(reader.result)
      }
    } else {
      setImage("")
    }
  }

  const handleChange = (e) => {
    const file = e.target.files[0]
    setFiles(file)
    previewFile(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(`${config.baseUrl}${category}`, {
        image: image,
        codename: codename,
        title: title,
        summary: summary,
      })

      if (result.status === 200) {
        setRedirect(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  if (redirect) {
    success()
  }

  const backdrop = {
    visible : { opacity : 1 },
    hidden : { opacity : 0 }
  }

  const modal = {
    hidden: {
      y: '-100vh',
      opacity: 0
    },
    visible:{
      y: '450px',
      opacity: 1,
      transition: {
        delay: 0.5,
      }
    }
  }

  if (!open) return null;
  return (
    <AnimatePresence mode='wait'>
      <motion.div 
        className='fixed top-0 left-0 w-full h-full bg-opacity-50 bg-black z-10'
        variants={backdrop}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <motion.div
          variants={modal}
        >
          <div onClick={(e) => { e.stopPropagation() }} className='modal absolute top-1/2 left-1/2 z-30'>
            <div className='mx-8 my-6'>
              <div className='flex items-center justify-between mb-4 pb-2 modal-header'>
                <h1 className='text-xl font-semibold'>CREATE A POST</h1>
                <Ai.AiOutlineClose onClick={onClose} size={30} className='cursor-pointer' />
              </div>

              <div className='modal-body'>
                <form onSubmit={handleSubmit}>
                  <div className="sm:flex justify-between px-0 sm:px-6">
                    <div className="flex items-center justify-center gap-2 w-full mb-3 sm:w-1/3 h-12 modal-category"><Ai.AiOutlineHeart size={24} /> LOVE</div>
                    <input className='sm:mb-3 w-full sm:w-auto' type="codename" placeholder='CODENAME' value={codename} onChange={ev => setCodename(ev.target.value)} />
                  </div>

                  <div className="flex flex-col py-4 px-0 sm:px-6 gap-3">
                    <input type="title" placeholder='TITLE' value={title} onChange={ev => setTitle(ev.target.value)} />
                    <textarea type="summary" placeholder='CONTENT' value={summary} onChange={ev => setSummary(ev.target.value)} className="placeholder:text-white" />
                    <input type="file" onChange={e => handleChange(e)} />
                    {image ? (
                      <img className='image-preview' src={image} alt="preview image" />
                    ) : (
                      <p>Peview Image</p>
                    )}
                  </div>

                  <div className='w-28 mx-auto'>
                    <Button type="submit" value="post" ><div className='flex items-center gap-2'><Ai.AiFillCheckCircle /> POST</div></Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Modal