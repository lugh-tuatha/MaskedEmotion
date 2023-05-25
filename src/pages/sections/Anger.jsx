import React, { useState, useEffect } from 'react'
import './sections.css'

import Header from '../../components/Header'
import Sidebar from '../../components/sidebar'
import MessagesContainerAnger from '../../posts-components/anger/MessagesContainerAnger'
import CreateAngerPost from '../../posts-components/anger/CreateAngerPost'
import Preload from '../../components/preload-component'
import Footer from '../../components/footer'



function Anger() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setLoading(true);

    fetch('https://emowall-backend.onrender.com/angerpost').then(response => {
      response.json().then(posts => {
        setPosts(posts);
        setLoading(false);
      });
    });
  }, []);

  return (
    <div>
      <Header />
      <div className="w-10/12 lg:w-9/12 mx-auto lg:flex lg:mt-8 lg:pb-24">
        <div className="mb-4 mr-10 xl:mr-0 lg:mb-0 w-1/5">
          <Sidebar />
        </div>

        <div className="xl:w-4/5">
          <h1 className='font-bold text-2xl hidden xl:block'>Anger</h1>
          <CreateAngerPost />

          <div className="grid lg:grid-cols-2 gap-4">
            {posts.length > 0 && posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(post => {
              return (
                <div>
                  <MessagesContainerAnger {...post} />
                </div>
              );
            })}
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

export default Anger