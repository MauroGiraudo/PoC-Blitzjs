import { LoginForm } from "../components/LoginForm"
import styles from "src/app/styles/NewUserimage.module.css"

export default function LoginPage() {
  return (
    <div className={styles.pageImageListContainer}>
      <div className={styles.imageListContainer}>
        <LoginForm />
      </div>
    </div>
  )
}
