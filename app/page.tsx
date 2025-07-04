import Image from 'next/image';

const Home = () => {
  return (
    <section>
      {/* -------Застосуємо інший шрифт для <h1> ------------*/}
      <h1 className="lobster" style={{ color: 'red' }}>
        Welcome to Home
      </h1>
      <p className="michroma" style={{ color: 'teal' }}>
        labore nemo? Nostrum exercitationem delectus quam odit id modi fuga
        possimus tempore, hic at omnis autem architecto ut cumque, ipsam qui
        quae unde doloremque! Nam quam quisquam molestias odio saepe ipsum
        dolorum. Consectetur voluptas sunt modi consequatur enim debitis,
        voluptate, iure exercitationem doloremque corporis hic distinctio porro
        cumque sed quam culpa animi? Nemo voluptates veritatis beatae maxime
        laboriosam? Recusandae alias beatae iusto. Deserunt, tenetur. Vitae,
        ducimus fugiat! Tempora, debitis eum cum nulla libero enim tempore
        temporibus o
      </p>
      <hr />

      <Image
        src="/test-image.jpg"
        alt="samurai"
        width={311}
        height={520}
        priority
      />
      <Image
        src="https://fastly.picsum.photos/id/38/200/200.jpg?hmac=dmdbTgVfAkQ41DmAJKt2u_w6vmqFO_UQ_Ro7F9U-Yws"
        alt="mountains"
        width={200}
        height={200}
        placeholder="blur"
        blurDataURL="https://fastly.picsum.photos/id/38/10/15"
      />
      <Image
        src="https://fastly.picsum.photos/id/953/200/200.jpg?hmac=S5zbAl9YqUc02Oezl6cR8gcLfF3pwkQ5_AcG8JXjeC0"
        alt="building and sky"
        width={200}
        height={200}
        placeholder="blur"
        blurDataURL="https://fastly.picsum.photos/id/953/10/10.jpg?hmac=S5zbAl9YqUc02Oezl6cR8gcLfF3pwkQ5_AcG8JXjeC0"
      />
    </section>
  );
};

export default Home;
