
import { useState } from 'react';
import { Card } from '../../components/Card/Card';
import { Button } from '../../components/Button/Button';
import { useMatchesWidgetsContext } from './MatchesWidgetsContext';
import { useMatchContext } from '../match-details/MatchContext';
import { MatchWidget } from '../../modules/matches-widgets/domain/MatchWidget';

export function AddMatchWidgetForm() {
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  const { createMatchWidget } = useMatchesWidgetsContext();
  const { getMatch } = useMatchContext();

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { id } = event.target.elements;

    if (!id) {
      return;
    }

    const match = await getMatch(parseInt(id.value));

    if (!match) {
      return;
    }

    const newMatchWidget = {
      id: id.value,
      name: `${match.localTeam.shortName} vs ${match.visitorTeam.shortName}`
    } as MatchWidget;

    createMatchWidget(newMatchWidget);

    // // const error = await
    
    // // const name = formData.get('name') as string;
    // console.log(name);
  }


  return (
    <Card>
      <div>
        {!isFormVisible && (
          <Button onClick={() => setIsFormVisible(true)}>Añadir partido</Button>
        )}
        {isFormVisible && (
          <form onSubmit={submitForm}>
            <input type="text" name="id" placeholder="ID" />
            <Button type="submit">Añadir</Button>
          </form>
        )}
      </div>
    </Card>
  )
}