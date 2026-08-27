const getGreeting = () => {
    const hour = new Date().getHours();

    if(hour < 12 ) return "Good morning"
    if(hour < 17 ) return "Good afternoon"
    return "Good evening";
};


const Greeting = ({ firstName}: { firstName: string }) => {
    return (
        <div className="flex gap-2 items-center">
            <p className="font-heading text-md text-foreground">
                {getGreeting()}
            </p>
            <h1 className="mt-1 font-heading text-md text-primary">
                {firstName}.
            </h1>
        </div>
    )
};


export default Greeting;