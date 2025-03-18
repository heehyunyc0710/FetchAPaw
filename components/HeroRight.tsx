import Image from 'next/image'

const HeroRight = () => {
  return (
    <div className="flex justify-center w-1/3">
            <Image
              src="/images/dog.png"
              alt="landing-image"
              width={500}
              height={500}
              className="object-contain w-full h-auto"
            />
          </div>
  )
}

export default HeroRight