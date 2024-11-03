import React, { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectRoute = ({ route, children }) => {
  const { role, userInfo } = useSelector((state) => state.auth)
  if (role) {
    //check role something seller or admin ...
    if (route.role) {
      //check infomation user
      if (userInfo) {
        //check infomation and role in token
        if (userInfo.role === route.role) {
          // Check for specific status requirement
          if (route.status) {
            if (userInfo.status === route.status) {
              return <Suspense fallback={null}>{children}</Suspense>
            } else {
              if (userInfo.status === 'pending') {
                return <Navigate to="/seller/account-pending" replace />
              } else if (userInfo.status === 'deactive') {
                return <Navigate to="/seller/account-deactive" replace />
              }
            }
          }
          // If no specific status, check visibility
          if (route.visibility) {
            if (route.visibility.some((r) => r === userInfo.status)) {
              return <Suspense fallback={null}>{children}</Suspense>
            } else {
              return <Navigate to="/seller/account-pending" replace />
            }
          }
          // Default case for authorized user
          return <Suspense fallback={null}>{children}</Suspense>
        } else {
          return <Navigate to="/unauthorized" replace />
        }
      }
      //end check user.info and decentralization
    } else {
      // If no specific route role, check for route ability
      if (route.ability === 'seller') {
        return <Suspense fallback={null}>{children}</Suspense>
      }
      //end check ability
    }
  } else {
    return <Navigate to="/login" replace />
  }
}

export default ProtectRoute
