Feature: Timeline

    @Posting
    Scenario: Posting: Alice can publish messages to a personal timeline
        Given Alice wants to publish on her timeline a message as shown in the table
            | author | Alice |
            | message | Bonjour je suis Alice, enchantée. |
        When Alice posts her message
        Then The message is created as shown in the table
            | author | Alice |
            | message | Bonjour je suis Alice, enchantée. |

    @Reading
    Scenario: Reading: Bob can view Alice timeline
        Given Bob can view Alice timeline as shown in the table
            | messages                                 |
            | Bonjour je suis Alice, enchantée.        |
            | Salut Alice, je suis Mallory, enchantée. |
        When Bob browse Alice timeline
        Then All messages appear in the timeline as shown in the table
            | messages                                 |
            | Bonjour je suis Alice, enchantée.        |
            | Salut Alice, je suis Mallory, enchantée. |