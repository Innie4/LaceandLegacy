import { Link } from "react-router-dom"

const FooterLinks = () => {
  const linkGroups = [
    {
      title: "Shop",
      links: [
        { name: "All Products", href: "/products" },
        { name: "New Arrivals", href: "/products?filter=new" },
        { name: "Sale", href: "/products?filter=sale" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Contact Us", href: "/contact" },
        { name: "FAQ", href: "/faq" },
        { name: "Return Policy", href: "/return-policy" },
        { name: "Shipping Info", href: "/shipping" },
      ],
    },
  ]

  return (
    <>
      {linkGroups.map((group) => (
        <div key={group.title}>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">{group.title}</h3>
          <ul className="mt-4 space-y-4">
            {group.links.map((link) => (
              <li key={link.name}>
                <Link to={link.href} className="text-gray-400 hover:text-white text-sm">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  )
}

export default FooterLinks
