export default function UserProfile({params}:any){
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-center">Profile Page</h1><br/>
            <p className="lead text-center"><strong>Profile {params.id}</strong></p>
        </div>
    )
}