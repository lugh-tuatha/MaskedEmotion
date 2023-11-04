import React, { useState, useEffect } from 'react'

import Header from '../../components/Header'
import Sidebar from '../../components/sidebar'
import MessagesContainerSad from '../../posts-components/sadness/MessagesContainerSad'
import CreateSadPost from '../../posts-components/sadness/createNewPost'
import Preload from '../../components/preload-component'
import Footer from '../../components/footer'
import config from '../../../config/config.json'

function Sadness() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setLoading(true);

    fetch(`${config.baseUrl}sadpost`).then(response => {
      response.json().then(posts => {
        setPosts(posts);
        setLoading(false);
      });
    });
  }, []);
  
  return (
    <div>
      <Header />
      <div className="container-width lg:flex lg:mt-8 lg:pb-24">
        <div className="mb-4 mr-10 xl:mr-0 lg:mb-0 w-full lg:w-1/5">
          <Sidebar />
        </div>

        <div className="w-full xl:w-4/5">
          <h1 className='font-bold text-2xl hidden xl:block mb-2'>Sadness</h1>
          <CreateSadPost />

          <div className="grid lg:grid-cols-2 gap-4">
            {posts.length > 0 && posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((post, index) => (
              <div key={index}>
                <MessagesContainerSad {...post} />
              </div>
            ))}
          </div>
          

          {loading && (
            <div className="grid lg:grid-cols-2 gap-4">
              <Preload/>
              <Preload/>
              <Preload/>
              <Preload/>
            </div>
          )}
          
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Sadness