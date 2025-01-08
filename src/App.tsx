import { Container, Typography } from "@mui/material"
import { Form } from "./components"


export const App = () => {

  return (
    <Container>
      <Typography variant='h3' textAlign={'center'}>
        Form Challenge
      </Typography>

      <Form />

    </Container>
  )
}
