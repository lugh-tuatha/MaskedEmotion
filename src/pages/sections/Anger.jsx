import React, { useEffect, useState } from 'react';
import config from '../../../config/config.json'
import useFetch from '../../hooks/useFetch'

import MessagesContainerAnger from '../../posts-components/anger/MessagesContainerAnger'
import CreateAngerPost from '../../posts-components/anger/CreateAngerPost'
import Preload from '../../components/preload-component'
import Section from '../../layout/Section'
import HeadsUp from '../../components/modal/HeadsUp';

function Anger() {
  const { data, loading } = useFetch(`${config.baseUrl}angerpost`)
  const [showHeadsUp, setShowheadsUp] = useState(false)

  const showHeadsUpModal = () => {
    if (loading) {
      setTimeout(() => {
        if (loading) {
          setShowheadsUp(true)
        }
      }, 7500);
    }
  }

  useEffect(() => {
    showHeadsUpModal()
  }, [loading])

  return (
    <Section>
      <div className="w-full xl:w-4/5">
        <h1 className='font-bold text-2xl hidden xl:block mb-2'>Anger</h1>
        <CreateAngerPost />

        <div className="grid lg:grid-cols-2 gap-4">
          {data.length > 0 && data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((post, index) => (
            <div key={index}>
              <MessagesContainerAnger {...post} />
            </div>
          ))}
        </div>
        

        {loading && (
          <div className="grid lg:grid-cols-2 gap-4">
            <Preload/>
            <Preload/>
            <Preload/>
            <Preload/>

            {showHeadsUp && (
              <div className="absolute w-screen h-screen top-0 left-0 flex items-center justify-center">
                <div className='heads-up h-2/5 '>
                  <HeadsUp />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Section>
  )
}

export default Anger