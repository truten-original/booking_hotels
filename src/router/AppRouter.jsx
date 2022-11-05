import { Routes, Route, Navigate } from 'react-router-dom'
import { publicRoutes, privateRoutes, adminRoutes } from './routes'
const AppRouter = () => {
  const isAuth = true
  const isAdmin = true
  return (
    <Routes>
      {isAuth &&
        privateRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      {isAdmin &&
        adminRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      {publicRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element}>
          {route.nestedPath ? (
            <Route path={route.nestedPath} element={route.nestedElement} />
          ) : null}
        </Route>
      ))}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRouter
