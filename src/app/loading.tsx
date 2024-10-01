import {Spinner} from "@nextui-org/spinner";

const loading = () => {
    return (
        <div className="fixed flex justify-center items-center min-h-screen inset-0 z-50 backdrop-blur-sm">
            <Spinner />
        </div>
    );
};

export default loading;