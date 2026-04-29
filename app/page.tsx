import HomeSection    from '@/components/sections/HomeSection'
import OurStorySection from '@/components/sections/OurStorySection'
import GallerySection  from '@/components/sections/GallerySection'
import MessagesSection from '@/components/sections/MessagesSection'

export default function Home() {
  return (
    <main>
      <HomeSection />
      <OurStorySection />
      <GallerySection />
      <MessagesSection />
    </main>
  )
}
