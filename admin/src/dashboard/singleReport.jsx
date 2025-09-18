
import Layout from "../layout/Layout";
import { useParams } from "react-router-dom";

const singleReport = ()=>{
    const params = useParams();
    console.log(params);
    return(
        <Layout>
        <div>singleReport</div>
        </Layout>
    )
}

export default singleReport;