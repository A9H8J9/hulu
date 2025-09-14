'use client'
import { Box, SimpleGrid, VStack, HStack, Image, Text } from "@chakra-ui/react";
import { axiosClient } from "../../lib/axios";
import { useEffect, useState } from "react";
import { Carousel } from "@ark-ui/react";
import Link from "next/link";

export default function Home() {
  const [movies, setMovies] = useState({});
  const [genres, setGenres] = useState([]);

  const genreTranslations = {
    action: "اکشن",
    adventure: "ماجراجویی",
    animation: "انیمیشن",
    biography: "زندگینامه",
    comedy: "کمدی",
    crime: "جنایی",
    documentary: "مستند",
    drama: "درام",
    family: "خانوادگی",
    fantasy: "فانتزی",
    history: "تاریخی",
    horror: "ترسناک",
    music: "موسیقی",
    mystery: "معمایی",
    romance: "عاشقانه",
    sport: "ورزشی",
    thriller: "هیجان انگیز",
    war: "جنگی",
    iranian: "ایرانی",
    foreign: "خارجی",
    all: "برگزیده"
  };

  useEffect(() => {
    const genresList = Object.keys(genreTranslations);

    Promise.all(
      genresList.map(genreName =>
        axiosClient.post(`https://seeko.film/api/v1/ghost/get/movies/sort?trending=2&genre=${genreName}&free=1&country=0&persian=1&query=&affiliate=1&imdb=&page`)
      )
    ).then(responses => {
      const newData = {};
      responses.forEach((res, i) => {
        newData[genresList[i]] = res.data.data.movies;
      });
      setMovies(newData);
    }).catch(err => console.error(err));

    axiosClient.get('https://web.upera.tv/api/v1/new_genres')
      .then(res => setGenres(res.data.genres))
      .catch(err => console.error(err));

  }, []);
  const chunkArray = (array, size) => {
    return array.reduce((acc, _, i) => {
      if (i % size === 0) acc.push(array.slice(i, i + size))
      return acc
    }, [])
  }
  const groupedImages = chunkArray(genres.map((x) => x), 6)
  const movieEntries = Object.entries(movies);
  const sortedEntries = movieEntries.filter(([name]) => name !== "all");
  const allEntry = movieEntries.find(([name]) => name === "all");

  if (allEntry) {
    sortedEntries.splice(13, 0, allEntry);
  }
  return (
    <>
      {sortedEntries.map(([genreName, list], idx) => (
        <Box key={genreName}>
          <Text md={{ mt: 12 }} mt={12} mr={4} fontSize="xl" fontWeight="bold">
            {genreTranslations[genreName] || genreName}
          </Text>

          {genreName === "all" ? (
            <SimpleGrid mt={4} columns={[1, null, 4]} px={4} gap={2}>
              {list.slice(0, 4).map((x, i) => (
                <Box className="group" w="350px" h={200} key={i}>
                  <VStack
                    pt={20}
                    pr={10}
                    alignItems="start"
                    position="absolute"
                    _groupHover={{ bg: "blackAlpha.800", opacity: 1, transition: "all" }}
                    opacity={0}
                    w="350px"
                    h={200}
                    rounded="xl"
                  >
                    <Text>{x.name}</Text>
                    <Text>{x.year}</Text>
                    <Text bg="yellow.400" px={1} rounded="2xl" color="black" fontSize="sm">{x.genre}</Text>
                  </VStack>
                  <Image
                    bg="black"
                    w="full"
                    h="full"
                    rounded="xl"
                    src={`https://thumb.upera.shop/thumb?w=764&h=400&q=100&src=https://thumb.upera.shop/s3/backdrops/${x.backdrop}`}
                  />
                </Box>
              ))}
            </SimpleGrid>
          ) : (
            <SimpleGrid columns={[2, null, 7]} gap={3} px={4} md={{ mt: 4 }} mt={0}>
              {list.slice(0, 7).map((x, i) => (
                <Link href={`/${x.type}/${x.id}`} key={i}>
                  <Box className="group" md={{ w: "200px", h: 280, mt: 0 }} mt={6} w={180} h={240}>
                    <VStack
                      position="absolute"
                      _groupHover={{ bg: "blackAlpha.700", opacity: 1 }}
                      opacity={0}
                      md={{ w: "200px", h: 280 }}
                      w={180}
                      h={240}
                      rounded="xl"
                    >
                      <HStack md={{ mt: "210px" }} mt="170px">
                        <Text>{genreTranslations[genreName] || genreName}</Text>
                        <Text>.</Text>
                        <Text color="yellow.400">{x.rate}</Text>
                      </HStack>
                      <Text>{x.year}</Text>
                    </VStack>
                    <Image
                      bg="black"
                      md={{ w: "200px", h: 280 }}
                      w={180}
                      h={240}
                      rounded="xl"
                      src={`https://thumb.upera.shop/thumb?w=207&h=307&q=100&fmt=webp&src=https://thumb.upera.shop/s3/posters/${x.poster}`}
                    />
                    <Text mt={1} truncate>{x.name_fa}</Text>
                  </Box>
                </Link>
              ))}
            </SimpleGrid>
          )}
          {idx === 5 && genres.length > 0 && (
            <>
              <Text mt={20} mr={4} mb={4} fontSize="xl" fontWeight="bold" > دسته‌بندی</Text>
              <Carousel.Root defaultPage={0} slideCount={groupedImages.length}>
                <Box py={2} px={5} style={{ display: "flex", alignItems: "center", gap: 10, }}>
                  <div style={{ overflow: "hidden", flex: 1 }}>
                    <Carousel.ItemGroup
                      style={{
                        display: "flex",
                        gap: 10,
                        direction: "rtl",
                      }}
                    >
                      {groupedImages.map((group, groupIndex) => (
                        <Carousel.Item key={groupIndex} index={groupIndex}>
                          <div style={{ display: "flex", gap: 10 }}>
                            {group.map((item, imgIndex) => (
                              <Box w="260px" overflow="hidden" rounded="xl" key={imgIndex}>
                                <Box w="full" h="160px" overflow="hidden" rounded="xl" position="relative">
                                  <Image
                                    _hover={{ transform: "scale(1.2)" }}
                                    transition="transform 0.6s ease"
                                    bg="black"
                                    w="full"
                                    h="full"
                                    objectFit="cover"
                                    rounded="xl"
                                    src={item.cover}
                                  />
                                </Box>
                                <Text mt={2} textAlign="center" fontWeight="bold">
                                  {item.fa}
                                </Text>
                              </Box>
                            ))}
                          </div>
                        </Carousel.Item>
                      ))}

                    </Carousel.ItemGroup>
                  </div>
                </Box>
                <Carousel.IndicatorGroup style={{ marginTop: 10, display: "flex", gap: 6 }}>
                  {groupedImages.map((_, i) => (
                    <Carousel.Indicator key={i} index={i} />
                  ))}
                </Carousel.IndicatorGroup>
              </Carousel.Root>
            </>
          )}
        </Box >
      ))
      }
    </>
  );
}

