import Box from "@mui/material/Box"
import { TextField } from "@mui/material"
const LoginForm = () => {
  const inputStyles = { backgroundColor: "#eee", borderRadius: "10px" }
  return (
    <div>
      <Box
        className="form_container"
        component="form"
        sx={{
          mx: "auto",
          width: "50%",
          mt: "80px",
          "& .MuiTextField-root": { m: 1, width: "100%", color: "white" },
        }}
      >
        <TextField
          sx={inputStyles}
          id="outlined-disabled"
          label="Email"
          type="email"
          className="form_textField"
          color="secondary"
        />
        <TextField
          sx={inputStyles}
          id="outlined-password-input"
          label="Password"
          type="password"
          color="secondary"
        />
        <TextField
          type="submit"
          sx={{ ...inputStyles, backgroundColor: "blanchedalmond" }}
          value="Войти"
        />
      </Box>
    </div>
  )
}

export default LoginForm
