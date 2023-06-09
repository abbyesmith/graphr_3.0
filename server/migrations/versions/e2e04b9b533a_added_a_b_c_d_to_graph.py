"""added a, b, c & d to Graph

Revision ID: e2e04b9b533a
Revises: 899ad5dc2d51
Create Date: 2023-05-04 13:13:15.105064

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e2e04b9b533a'
down_revision = '899ad5dc2d51'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('graphs', schema=None) as batch_op:
        batch_op.add_column(sa.Column('a', sa.Float(), nullable=True))
        batch_op.add_column(sa.Column('b', sa.Float(), nullable=True))
        batch_op.add_column(sa.Column('c', sa.Float(), nullable=True))
        batch_op.add_column(sa.Column('d', sa.Float(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('graphs', schema=None) as batch_op:
        batch_op.drop_column('d')
        batch_op.drop_column('c')
        batch_op.drop_column('b')
        batch_op.drop_column('a')

    # ### end Alembic commands ###
