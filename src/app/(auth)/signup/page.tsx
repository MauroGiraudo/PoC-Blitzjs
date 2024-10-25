import { SignupForm } from "../components/SignupForm"
import styles from "src/app/styles/NewUserimage.module.css"

export default function SignUpPage() {
  return (
    <div className={styles.pageImageListContainer}>
      <div className={styles.imageListContainer}>
        <SignupForm />
      </div>
    </div>
  )
}
