import styles from "@home/styles/home.styles.module.scss"
import { HomeCard } from "@cards/ui/molecules";
import { getRamosByUser } from "@services/admin/branches";
import { verifyIsTokenValid } from "@services/auth/verifyToken";

export default async function Home() {

  await verifyIsTokenValid(); 

  const response = await getRamosByUser();

  const isServerError = response?.error

  const data = response?.data;

  return (
    <main className={styles.container}>
      {isServerError ? `Server Error: ${response.error}` : 
        <>
          <div className={styles.sub_container}>
            <h1 className={styles.title}>LogiWatch</h1>
            <h2 className={styles.subtitle}>Selecciona el ramo</h2>
            <div className={styles.cards_container}>

            {data.payload ? 
                data.payload.map((data: any)=>{
                  return(
                    <HomeCard 
                      key={data.id}
                      title={data.descripcion} 
                      products={data.productos}
                      vigency={data.vigente}
                      id={data.id}
                    />
                  )
                })
              : 
              <span>No hay ramos disponibles</span>
            }

            </div>
          </div>
          <span className={styles.botom_text}>2024</span>
        </>
      }
          
    </main>

  )
}
