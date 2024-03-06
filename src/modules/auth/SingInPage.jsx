import React, { useContext } from "react";
import { Button, Card, Label, TextInput, Spinner } from "flowbite-react";
import { useFormik } from "formik";
import * as yup from "yup";
import { customAlertError } from "../../config/alert/alert";
import AxiosClient from "../../config/http-gateway/http-client";
import AuthContext from "../../config/context/auth-context";
import { useNavigate } from "react-router-dom";
// tailwindcss - flowbite-react
// Interfaz para iniciar Sesion

export default function SingInPage() {
  const { dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      username: yup.string().required("Campos Obligatorios"),
      password: yup.string().required("Campos Obligatorios"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await AxiosClient({
          url: "/auth/signin",
          method: "POST",
          data: values,
        });
        const Admin = response.data.roles[0].name == "ADMIN_ROLE";
        const User = response.data.roles[0].name == "USER_ROLE";
        const Client = response.data.roles[0].name == "CLIENT_ROLE";

        const { username } = response.data.user;
        const { name } = response.data.user.roles[0];
        localStorage.setItem("user", username);
        localStorage.setItem("rol", name);

        if (!response?.error) {
          dispatch({ type: "SIGNIN", payload: response.data });

          console.log(username, name);

          switch (name) {
            case Admin:
              navigate("admin", { replace: true });
              break;
            case User:
              navigate("user", { replace: true });
              break;
            case Client:
              navigate("client", { replace: true });
              break;
            default:
              break;
          }
        } else throw Error("Error");
      } catch (error) {
        console.log(error);
        customAlertError("Iniciar Sesion", "Usuario y/o incorrecto", "error");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Card>
        <form
          className="flex flex-col gap-4"
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="username" value="Username" />
            </div>
            <TextInput
              name="username"
              id="username"
              type="text"
              placeholder="your username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              helperText={
                formik.errors.username && formik.touched.username ? (
                  <span className="font-medium text-red-600">
                    {formik.errors.username}
                  </span>
                ) : null
              }
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Password" />
            </div>
            <TextInput
              name="password"
              id="password"
              type="password"
              placeholder="your password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              helperText={
                formik.errors.password && formik.touched.password ? (
                  <span className="font-medium text-red-600">
                    {formik.errors.password}
                  </span>
                ) : null
              }
            />
          </div>
          <Button
            type="submit"
            className="submit"
            disabled={formik.isSubmitting || !formik.isValid}
          >
            {formik.isSubmitting ? <Spinner /> : <>Iniciar Sesión</>}
          </Button>
        </form>
      </Card>
    </div>
  );
}

/**
 * Vite

entrar a la terminal 
cd _direccion_de_la_carpeta de la aplicacion
ejecutar el comando:
 npm create vite@latest
create-vite@5.2.0
Ok to proceed? (y) y
Project name: ... client
Select a framework: » React
Select a variant: » JavaScript + SWC
npm i 
npm run dev 
npm i animate.css axios flowbite flowbite-react postcss react-router-dom
npm i formik yup
npm install -D tailwindcss
npx tailwindcss init

index.css
@tailwind base;
@tailwind components;
@tailwind utilities;



npx tailwindcss -i ./src/index.css -o ./src/output.css
 */
