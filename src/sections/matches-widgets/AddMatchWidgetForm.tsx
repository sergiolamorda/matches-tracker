
import { useState } from 'react';
import { Card } from '../../components/Card/Card';
import { Button } from '../../components/Button/Button';
import { useMatchesWidgetsContext } from './MatchesWidgetsContext';
import { useMatchContext } from '../match-details/MatchContext';
import { MatchWidget } from '../../modules/matches-widgets/domain/MatchWidget';
import { isMatchWidgetIdValid } from '../../modules/matches-widgets/domain/MatchWidgetId';
import { Spinner } from '../../components/Spinner/Spinner';
import { Form } from '../../components/Form/Form';
import { Input } from '../../components/Input/Input';

import styles from './AddMatchWidgetForm.module.scss';

export function AddMatchWidgetForm() {
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { createMatchWidget, matchesWidgets } = useMatchesWidgetsContext();
  const { getMatch } = useMatchContext();

  const submitForm = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const form = event.target as HTMLFormElement;

    const id = form.elements.namedItem('id') as HTMLInputElement;

    const idValue = parseInt(id.value);

    if (!isMatchWidgetIdValid(idValue)) {
      setError('ID no válido');
      setIsSubmitting(false);
      return;
    }

    if (matchesWidgets.find((widget: MatchWidget) => widget.id === idValue)) {
      setError('El partido ya está añadido');
      setIsSubmitting(false);
      return;
    }

    const match = await getMatch(idValue);

    if (!match) {
      setError('El ID no corresponde a ningún partido');
      setIsSubmitting(false);
      return;
    }

    createMatchWidget({
      id: idValue,
      localLogo: match.localTeam.logo,
      localName: match.localTeam.shortName,
      visitorLogo: match.visitorTeam.logo,
      visitorName: match.visitorTeam.shortName,
    });

    setIsFormVisible(false);
    setIsSubmitting(false);
  }

  return (
    <Card>
      <div className={styles.addMatchWidgetForm}>
        {!isFormVisible && (
          <div className={styles.addMatchWidgetForm__initialState}>
            <Button onClick={() => setIsFormVisible(true)}>Añadir partido</Button>
          </div>
        )}
        {isFormVisible && (
          isSubmitting ? (
            <Spinner size="small" />
          ) : (
            <>
              <h3>Añade un nuevo partido</h3>
              <Form onSubmit={submitForm}>
                <Input 
                  id="id"
                  type="number"
                  name="id" 
                  placeholder="ID"
                  label='Introduce el ID del partido'
                  error={error}
                  autoComplete="off"
                />
                <Button type="submit" fullwidth>Añadir partido</Button>
              </Form>
            </>
          )
        )}
      </div>
    </Card>
  )
}