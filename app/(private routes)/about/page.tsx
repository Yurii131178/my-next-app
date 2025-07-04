import { Metadata } from 'next';
// import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'About',
};

const About = () => {
  // redirect('/');
  return <div>About</div>;
};
export default About;
