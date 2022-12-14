import * as React from "react";
import "./styles.css";
//import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
//import IconButton from "@mui/material/IconButton";
//import Input from "@mui/material/Input";
//import FilledInput from "@mui/material/FilledInput";
//import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
//import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
//import NativeSelect from '@mui/material/NativeSelect';
import MenuItem from "@mui/material/MenuItem";
import CalculateIcon from "@mui/icons-material/Calculate";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Typography from "@mui/material/Typography";

export default function CalculoIMC() {
  const [TipoAnalise, setTipoAnalise] = React.useState(1);

  const handleChangeTipoAnalise = (event) => {
    setTipoAnalise(event.target.value);
  };

  function formulaIMC(peso, altura_cm) {
    return peso / Math.pow(altura_cm / 100, 2);
  }

  function classificaoIMC_OMS_1988(valorIMC) {
    var classificao = "";
    if (valorIMC < 16) {
      classificao = "magreza grau III";
    } else if (valorIMC < 17) {
      classificao = "magreza grau II";
    } else if (valorIMC < 18.5) {
      classificao = "magreza grau I";
    } else if (valorIMC < 25) {
      classificao = "eutrofia";
    } else if (valorIMC < 30) {
      classificao = "pré-obesidade";
    } else if (valorIMC < 35) {
      classificao = "obesidade grau I";
    } else if (valorIMC < 40) {
      classificao = "obesidade grau II";
    } else {
      classificao = "obesidade grau III";
    }
    return classificao;
  }

  function classificaoLipschitz(valorIMC) {
    var classificao = "";
    if (valorIMC < 22) {
      classificao = "magreza";
    } else if (valorIMC < 27) {
      classificao = "eutrofia";
    } else {
      classificao = "excesso de peso";
    }
    return classificao;
  }

  return (
    <Box>
      <Container>
        <Typography mt={2} />
        <Typography variant="h4" gutterBottom>
          Cálculo do IMC
        </Typography>
        <FormControl variant="outlined">
          <TextField
            label="Peso"
            id="edtPeso"
            type="number"
            sx={{ m: 1, width: "28ch" }}
            InputProps={{
              endAdornment: <InputAdornment position="end">kg</InputAdornment>
            }}
            variant="filled"
          />
        </FormControl>
        <FormControl variant="outlined">
          <TextField
            label="Altura"
            id="edtAltura"
            sx={{ m: 1, width: "28ch" }}
            type="number"
            InputProps={{
              endAdornment: <InputAdornment position="end">cm</InputAdornment>,
              inputMode: "numeric",
              pattern: "[0-9,.]*"
            }}
            variant="filled"
          />
        </FormControl>
      </Container>
      <Container>
        <FormControl variant="filled">
          <InputLabel id="demo-simple-select-filled-label">
            Análise do IMC
          </InputLabel>

          <Select
            labelId="edtTipoFormula"
            id="edtTipoFormula"
            sx={{ m: 1, width: "25ch" }}
            defaultValue={1}
            onChange={handleChangeTipoAnalise}
          >
            <MenuItem value={1}>OMS, 1998</MenuItem>
            <MenuItem value={2}>
              Lipschitz, D.A, 1994(Idade &gt; 65 anos)
            </MenuItem>
          </Select>
        </FormControl>
      </Container>
      <Container>
        <Button
          sx={{ m: 1, width: "28ch" }}
          variant="contained"
          startIcon={<CalculateIcon />}
          onClick={() => {
            var valorIMC = formulaIMC(
              parseFloat(this.edtPeso.value),
              parseFloat(this.edtAltura.value)
            );
            console.log(TipoAnalise);
            this.edtIMC.value = valorIMC;
            if (TipoAnalise === 1) {
              this.edtObs.value = classificaoIMC_OMS_1988(valorIMC);
            } else {
              this.edtObs.value = classificaoLipschitz(valorIMC);
            }
          }}
        >
          Calcular
        </Button>
      </Container>
      <Container>
        <Typography variant="h4" gutterBottom>
          Resultados:
        </Typography>
        <TextField
          id="edtIMC"
          label="IMC (kg/m2)"
          defaultValue="0"
          sx={{ m: 1, width: "28ch" }}
          InputProps={{
            readOnly: true
          }}
        />
      </Container>
      <Container>
        <TextField
          id="edtObs"
          label="Observações"
          multiline
          rows={4}
          defaultValue="-"
          sx={{ m: 1, width: "28ch" }}
          InputProps={{
            readOnly: true
          }}
        />
      </Container>
    </Box>
  );
}
