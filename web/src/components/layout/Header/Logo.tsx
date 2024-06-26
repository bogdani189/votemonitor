function Logo({ width, height }: { width: number; height: number }) {
  return (
    <>
      <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 148 147' fill='none'>
        <path
          d='M73.561 147C32.9993 147 0 114.027 0 73.5C0 32.9719 32.9993 0 73.561 0C114.123 0 147.122 32.9719 147.122 73.5C147.122 114.027 114.123 147 73.561 147Z'
          className='fill-secondary-300'
        />
        <g className='fill-gray-900'>
          <path d='M53.4689 91.4484H91.1516L72.3103 58.841L53.4689 91.4484ZM98.806 95.8638H45.8146L72.3103 50.0103L98.806 95.8638Z' />
          <path d='M81.3352 91.4484H119.018L100.177 58.841L81.3352 91.4484ZM126.672 95.8638H73.6808L100.176 50.0103L126.672 95.8638Z' />
          <path d='M23.6543 54.4158L42.4957 87.0231L61.337 54.4158H23.6543ZM42.4957 95.8535L16 50H68.9914L42.4957 95.8535Z' />
        </g>
      </svg>
    </>
  );
}

export default Logo;
