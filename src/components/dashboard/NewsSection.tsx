export function NewsSection() {
    const news = [
      { title: "¡Protege tus datos!", body: "Nunca compartas tu contraseña con nadie." },
      { title: "Evita fraudes", body: "Revisa tus transacciones regularmente." },
      { title: "Nueva función disponible", body: "Ahora puedes subir tus documentos desde tu perfil." },
    ]
  
    return (
      <div className="bg-white dark:bg-darkBackground p-4 rounded-xl shadow border border-border">
        <h3 className="text-lg font-semibold mb-4 text-text">Noticias</h3>
        <ul className="space-y-3">
          {news.map((n, i) => (
            <li key={i}>
              <h4 className="text-primary font-bold">{n.title}</h4>
              <p className="text-sm text-gray-600 dark:text-lightText">{n.body}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }
  