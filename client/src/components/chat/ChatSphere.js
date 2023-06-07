import React,{useEffect} from 'react'
import TagCloud from 'TagCloud'
import '../../style/chat/chatSphere.css'
function ChatSphere() {
    useEffect(() => {
      return () => {
        const container = '.tagcloud';
        const texts = [
            '.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.',
            '.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.',

        ];
        const options = {
            radius: 300,
            maxSpeed: 'normal',
            initSpeed: 'normal',
            keep: true
        }
        TagCloud(container, texts, options)
      }
    }, [])
    
  return (
    <div className='text-sphere'>
        <span className='tagcloud'></span>
    </div>
  )
}

export default ChatSphere