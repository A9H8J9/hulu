import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"
import { Box } from "@chakra-ui/react"

export default function MainLayout(props: { children: React.ReactNode }) {
  const { children } = props
  return (
    <Box>
      <Navbar />
      {children}
      <Footer />
    </Box>
  )
}