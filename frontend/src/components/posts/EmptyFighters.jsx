import Button from "@/components/ui/Button"
import "./PostComponentAll.scss"

const EmptyFighters = ({
  title = "옥타곤이 아직 비어 있습니다",
  description = "첫 번째 선수를 기록하고 Octalog를 시작해보세요.",
  buttonText = "FIGHTER 기록",
  onClick,
}) => {
  return (
    <div className="empty-fighters">
      <div className="empty-octagon">
        <span>O</span>
      </div>

      <h3>{title}</h3>
      <p>{description}</p>

      {onClick && (
        <Button
          text={buttonText}
          className="primary"
          onClick={onClick}
        />
      )}
    </div>
  )
}

export default EmptyFighters