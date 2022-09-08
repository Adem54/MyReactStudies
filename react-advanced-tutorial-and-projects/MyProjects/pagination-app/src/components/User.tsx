import { User as UserType } from './user.model'

const User = ({user}:UserPropsType) => {
    const {avatar_url,login}=user;
  return (
    <section className="card">
          <img
            className="avatar-url"
            src={avatar_url}
            alt=""
          />
          <span className="login">{login}</span>
          <h3>VIEW PROFILE</h3>
        </section>
  )
}

interface UserPropsType {
    user:UserType;
}

User.defaultProps={
    user:{} as UserType,
}


export default User