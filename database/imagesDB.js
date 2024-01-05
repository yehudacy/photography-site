const { pool } = require('./dbConnection');
const { getCategoryIdByName } = require('./categoryDB')

//add an image to the data base
const addImage = async (categoryId, src, clientId = null) => {
        let addImageQuery = `
        INSERT INTO images (category_id, client_id, src) 
        VALUES (?, ?, ?)`;
        const [addedImage] = await pool.query(addImageQuery, [categoryId, clientId, src]);
        // console.log(addedImage);
        return addedImage;
};

//get all images
const getAllImages = async () => {
  const getImagesQuery = `
  SELECT * FROM images`;
  const [images] = await pool.query(getImagesQuery);
  // console.log(images)
  return images;
};


//get an image by id
const getImage = async (imageId) => {
    
}

const itemData = [
    {
      img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
      title: "new_born",
      author: "@bkristastucchio",
      rows: 2,
      cols: 2,
      featured: true,
      categoryId: 1,
    },
    {
      img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
      title: "Burger",
      author: "@rollelflex_graphy726",
      categoryId: 2,
    },
    {
      img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
      title: "Camera",
      author: "@helloimnik",
      categoryId: 3,
    },
    {
      img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
      title: "Coffee",
      author: "@nolanissac",
      cols: 2,
      categoryId: 4,
    },
    {
      img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
      title: "Hats",
      author: "@hjrc33",
      cols: 2,
      categoryId: 5,
    },
    {
      img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
      title: "Honey",
      author: "@arwinneil",
      rows: 2,
      cols: 2,
      featured: true,
      categoryId: 5,
    },
    {
      img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
      title: "Basketball",
      author: "@tjdragotta",
      categoryId: 7,
    },
    {
      img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
      title: "Fern",
      author: "@katie_wasserman",
      categoryId: 8,
    },
    {
      img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
      title: "Mushrooms",
      author: "@silverdalex",
      rows: 2,
      cols: 2,
      categoryId: 9,
    },
    {
      img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
      title: "Tomato basil",
      author: "@shelleypauls",
      categoryId: 10,
    },
    {
      img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
      title: "Sea star",
      author: "@peterlaster",
      categoryId: 11,
    },
    {
      img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
      title: "Bike",
      author: "@southside_customs",
      cols: 2,
      categoryId: 12,
    },
  ];
  //add all category images
  // const add = () => {
  //   itemData.forEach(async (item, i) => {
  //       await addImage(i + 1, item.img);
  //   })
  // }
  // add()



  const itemData2 = [
    {
      img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
      title: "new_born",
    },
    {
      img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
      title: "new_born",
    },
    {
      img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
      title: "new_born",
    },
    {
      img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
      title: "Burger",
    },
    {
      img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
      title: "Burger",
    },
    {
      img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
      title: "Camera",
      author: "@arwinneil",
    },
    {
      img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
      title: "Camera",
    },
    {
      img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
      title: "Coffee",
    },
    {
      img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
      title: "Coffee",
    },
    {
      img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
      title: "Hats",
    },
    {
      img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
      title: "Hats",
    },
    {
      img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
      title: "Honey",
    },
  ];
  // add all images
  // const add2 = () => {
  //   itemData2.forEach(async (item, i) => {
  //     const categoryId = await getCategoryIdByName(item.title);
  //     await addImage(categoryId, item.img);
  //   })
  // }
  // add2();
  // getAllImages();
  module.exports = {addImage, getAllImages}